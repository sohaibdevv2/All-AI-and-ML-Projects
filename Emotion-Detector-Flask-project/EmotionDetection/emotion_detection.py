import requests
import json

def _empty_emotion_response():
    return {
        'anger': None,
        'disgust': None,
        'fear': None,
        'joy': None,
        'sadness': None,
        'dominant_emotion': None
    }

def emotion_detector(text_to_analyze):
    """Call the remote Watson emotion endpoint with basic error handling.

    On network errors or non-200 responses this returns a dict with None values
    so callers can handle failures without raising exceptions.
    """
    URL = 'https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict'
    header = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}
    input_json = {"raw_document": {"text": text_to_analyze}}

    try:
        response = requests.post(URL, json=input_json, headers=header, timeout=10)
        formated_response = json.loads(response.text)

        if response.status_code == 200:
            return formated_response
        else:
            return _empty_emotion_response()

    except requests.exceptions.RequestException as e:
        # Print to stdout/stderr so logs show the failure; callers will receive an empty response
        print(f"Error calling Watson emotion endpoint: {e}")
        return _empty_emotion_response()


def emotion_predictor(detected_text):
    if not isinstance(detected_text, dict):
        return _empty_emotion_response()

    # If the detector returned the empty structure, pass it through
    if all(value is None for value in detected_text.values()):
        return detected_text

    # Typical successful response includes 'emotionPredictions' with a list
    if detected_text.get('emotionPredictions'):
        emotions = detected_text['emotionPredictions'][0].get('emotion', {})
        anger = emotions.get('anger')
        disgust = emotions.get('disgust')
        fear = emotions.get('fear')
        joy = emotions.get('joy')
        sadness = emotions.get('sadness')
        if emotions:
            max_emotion = max(emotions, key=emotions.get)
            return {
                'anger': anger,
                'disgust': disgust,
                'fear': fear,
                'joy': joy,
                'sadness': sadness,
                'dominant_emotion': max_emotion
            }

    return _empty_emotion_response()