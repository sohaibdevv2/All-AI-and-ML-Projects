"""
Emotion Detection Server

This script defines a Flask-based server for performing emotion detection on user-provided text.
"""

from flask import Flask, render_template, request
from EmotionDetection.emotion_detection import emotion_detector
from EmotionDetection.emotion_detection import emotion_predictor

app = Flask("Emotion Detection")

def run_emotion_detection():
    """
    Main function to run the Emotion Detection application.
    """
    app.run(host="0.0.0.0", port=5000)

@app.route("/emotionDetector")
def sent_detector():
    """
    Analyze the user-provided text for emotions and return the result.
    """
    text_to_detect = request.args.get('textToAnalyze')
    response = emotion_detector(text_to_detect)
    formated_response = emotion_predictor(response)

    # If the external service failed, emotion_detector returns the empty dict
    # with all None values; treat that as a service failure and return 503.
    if formated_response['dominant_emotion'] is None:
        # Service-level failure vs. actual processed input both map to None.
        # If you want to distinguish them more reliably, add an 'error' flag
        # in emotion_detector when exceptions occur.
        return "Service temporarily unavailable. please try again later.", 503

    return (
        f"For the given statement, the system response is 'anger': {formated_response['anger']} "
        f"'disgust': {formated_response['disgust']}, 'fear': {formated_response['fear']}, "
        f"'joy': {formated_response['joy']} and 'sadness': {formated_response['sadness']}. "
        f"The dominant emotion is {formated_response['dominant_emotion']}."
    )

@app.route("/")
def render_index_page():
    ''' This function initiates the rendering of the main application
        page over the Flask channel
    '''
    return render_template('index.html')

if __name__ == "__main__":
    run_emotion_detection()
