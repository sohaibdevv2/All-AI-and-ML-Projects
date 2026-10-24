<div align="center">

```
██████╗ ██╗   ██╗██████╗ ███████╗██████╗  █████╗ ████████╗ █████╗
██╔══██╗██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
██████╔╝██║   ██║██████╔╝█████╗  ██║  ██║███████║   ██║   ███████║
██╔═══╝ ██║   ██║██╔══██╗██╔══╝  ██║  ██║██╔══██║   ██║   ██╔══██║
██║     ╚██████╔╝██║  ██║███████╗██████╔╝██║  ██║   ██║   ██║  ██║
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
```

**Automatic data cleaning + silent drift detection. Two problems. One library.**

[![PyPI](https://img.shields.io/pypi/v/puredatalib?color=7b2fff&label=PyPI)](https://pypi.org/project/puredatalib/)
[![Python](https://img.shields.io/pypi/pyversions/puredatalib?color=00d4ff)](https://pypi.org/project/puredatalib/)
[![License](https://img.shields.io/badge/license-MIT-ff6b2b)](LICENSE)
[![CI](https://github.com/sohaibdevv/puredata.py/actions/workflows/ci.yml/badge.svg)](https://github.com/sohaibdevv/puredata.py/actions)
[![Coverage](https://img.shields.io/badge/coverage-93%25-4ade80)](https://github.com/sohaibdevv/puredata.py)
[![Tests](https://img.shields.io/badge/tests-123%20passed-4ade80)](https://github.com/sohaibdevv/puredata.py)

[**Website**](https://sohaibdevv.github.io/puredata) · [**PyPI**](https://pypi.org/project/puredatalib/) · [**Changelog**](CHANGELOG.md) · [**Contributing**](CONTRIBUTING.md)

</div>

---

## What is puredata?

puredata solves two of the biggest day-to-day problems in data science:

**Problem 1 — Dirty data wastes your time.**
Every dataset has nulls, inconsistent categories, mixed units, encoding errors, and outliers. Cleaning them manually takes days. puredata cleans everything automatically in one line.

**Problem 2 — Data drift silently kills your models.**
Your model works perfectly in training. Then production data changes — different distributions, new null patterns, schema mutations — and predictions silently degrade. puredata detects this before it happens.

---

## Install

```bash
pip install puredatalib
```

```python
import puredata  # same import name
```

Works on **Windows, macOS, and Linux**. Requires Python 3.9+.

---

## Quick Start — 5 lines

```python
import puredata

# Clean your messy dataset automatically
clean_df, report = puredata.clean(df)
print(report.summary())   # see exactly what was fixed
print(report.mend_score)  # 0–100 health score
```

```python
# Detect drift before it crashes your model
contract = puredata.watch(train_df)          # profile training data
result   = puredata.check(prod_df, contract) # validate production batch
result.raise_if_failed()                     # raise if drift detected
```

---

## Why puredata?

| Without puredata | With puredata |
|---|---|
| 300 lines of custom cleaning code | `clean_df, report = puredata.clean(df)` |
| Models break silently in production | Drift caught before prediction |
| No audit trail of what changed | Full repair report for every fix |
| Rewriting cleaning logic per project | One contract, reused everywhere |
| Discovering issues after training | Caught at ingest |

---

## AutoClean — 9 Automatic Stages

Every dataset passes through nine stages in order:

| # | Stage | What it fixes | Before → After |
|---|---|---|---|
| 1 | Encoding | BOM markers, zero-width spaces | `﻿Alice` → `Alice` |
| 2 | Whitespace | Leading/trailing/double spaces | `"  John  "` → `"John"` |
| 3 | Types | Numeric strings stored as text | `"42.0"` → `42.0` |
| 4 | Dates | 12+ date formats → ISO 8601 | `"Jan 5 2023"` → `2023-01-05` |
| 5 | Duplicates | Exact duplicate rows | 23 extra rows → removed |
| 6 | Categories | Inconsistent labels | `M / Male / male` → `Male` |
| 7 | Units | Mixed measurement units | `70kg / 154lbs` → all in kg |
| 8 | Nulls | Missing values — adaptive imputation | `NaN` → imputed value |
| 9 | Outliers | Statistical anomalies — ensemble voting | extreme values flagged |

**Null imputation strategy (adaptive):**
- 0–40% missing → KNN imputation
- 40–99% missing → Iterative/MICE imputation
- 100% missing → fill with zero

**Outlier detection uses 4 algorithms voting together:**
IQR + Z-score + Isolation Forest + Local Outlier Factor.
A value is only flagged when enough detectors agree — no false positives from a single method.

**MendScore** — your dataset's health score after cleaning:
```
MendScore = (1 − cells_fixed / total_cells) × 100
```

---

## DataWatch — 7 Silent Checks

Fit once on training data. Check every batch forever.

| # | Check | What it catches | Severity |
|---|---|---|---|
| 1 | Schema | Missing or extra columns | FAIL |
| 2 | Dtype | Column type changed | FAIL |
| 3 | Null rate | Sudden spike in missing values | WARN |
| 4 | Range | Values outside historical bounds | FAIL |
| 5 | Drift | Distribution shift (PSI + KS) | FAIL |
| 6 | Cardinality | New unseen category labels | WARN |
| 7 | Custom rules | Your own validation functions | configurable |

**Drift uses a dual-gate** — both must fail to declare drift:
1. PSI (Population Stability Index) > threshold
2. KS test p-value < 0.05

This prevents false positives on small batches.

**Compatibility Score:**
```
CompatScore = (n_passed + n_warned × 0.5) / total × 100
```

---

## Configuration

```python
from puredata.core.clean import AutoClean, AutoCleanConfig

config = AutoCleanConfig(
    fix_nulls=True,
    fix_outliers=True,
    fix_categories=True,
    fix_units=True,
    outlier_threshold=0.6,  # 60% of detectors must agree
    target_col="price",     # protect this column from changes
)
clean_df, report = AutoClean(config).clean(df)
```

```python
from puredata.core.watch import DataWatch

watcher  = DataWatch(mode="strict", drift_threshold=0.2)
contract = watcher.fit(train_df)
contract.add_rule("price", lambda df, col: (df[col] > 0).all())
contract.save("contract.json")

# Later in production
from puredata import DataContract
contract = DataContract.load("contract.json")
result   = puredata.check(prod_df, contract)
```

---

## sklearn Pipeline

```python
from puredata import MendPipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ("clean", MendPipeline(watch_mode="strict")),
    ("model", RandomForestClassifier()),
])
pipe.fit(X_train, y_train)
pipe.predict(X_prod)  # raises DataCompatibilityError if drift detected
```

---

## CLI

```bash
# Clean any CSV/Excel/Parquet/JSON file
puredata clean data.csv -o clean.csv --report-html report.html

# Fit a contract
puredata watch train.csv --contract contract.json

# Validate in CI/CD (exit code 1 on failure)
puredata check prod.csv contract.json --strict

# Health score
puredata score mydata.csv

# Interactive dashboard
puredata dashboard mydata.csv
```

---

## Integrations

```python
# MLflow
from puredata.integrations.mlflow import log_clean_report
with mlflow.start_run():
    clean_df, report = puredata.clean(df)
    log_clean_report(report)

# Weights & Biases
from puredata.integrations.wandb import log_clean_report
log_clean_report(report)

# DVC
from puredata.integrations.dvc import write_metrics
write_metrics(report)

# Polars (pass directly)
import polars as pl
clean_df, report = puredata.clean(pl.read_csv("data.csv"))
```

---

## Comparison

| Feature | puredata | pandas | pyjanitor | great_expectations | evidently |
|---|:---:|:---:|:---:|:---:|:---:|
| Auto null imputation | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ensemble outlier detection | ✅ | ❌ | ❌ | ❌ | ❌ |
| Fuzzy category normalisation | ✅ | ❌ | ⚡ | ❌ | ❌ |
| Mixed unit normalisation | ✅ | ❌ | ❌ | ❌ | ❌ |
| Encoding repair | ✅ | ❌ | ❌ | ❌ | ❌ |
| Dual-gate drift detection | ✅ | ❌ | ❌ | ❌ | ✅ |
| JSON data contracts | ✅ | ❌ | ❌ | ⚡ | ⚡ |
| One-line API | ✅ | ❌ | ⚡ | ❌ | ❌ |
| MendScore | ✅ | ❌ | ❌ | ❌ | ❌ |
| HTML/JSON/CSV reports | ✅ | ❌ | ❌ | ✅ | ✅ |
| sklearn pipeline | ✅ | ❌ | ❌ | ❌ | ❌ |
| MLflow/W&B/DVC | ✅ | ❌ | ❌ | ⚡ | ⚡ |
| Full CLI | ✅ | ❌ | ❌ | ❌ | ❌ |
| Plugin system | ✅ | ❌ | ❌ | ❌ | ❌ |

✅ Full · ⚡ Partial · ❌ Not available

---

## API Reference

| Function | Description | Returns |
|---|---|---|
| `puredata.clean(df, config, target_col)` | Clean a DataFrame | `(DataFrame, CleanReport)` |
| `puredata.watch(df)` | Fit contract on reference data | `DataContract` |
| `puredata.check(df, contract, mode)` | Validate against contract | `WatchReport` |
| `puredata.score(df)` | Get MendScore 0–100 | `int` |
| `puredata.dashboard(df)` | Open HTML dashboard | `str` (path) |

### CleanReport properties
```python
report.mend_score        # int 0–100
report.fixes             # list[Fix]
report.original_shape    # (rows, cols)
report.cleaned_shape     # (rows, cols)
report.duration_seconds  # float
report.summary()         # str
report.to_json(path)
report.to_html(path)
report.to_csv(path)
```

### WatchReport properties
```python
result.compatibility_score  # int 0–100
result.passed               # bool
result.n_passed / n_warned / n_failed
result.checks               # list[CheckResult]
result.raise_if_failed()    # raises DataCompatibilityError
result.to_json(path)
result.to_html(path)
```

---

## Project Structure

```
puredata/
├── core/
│   ├── clean.py       AutoClean — 9-stage pipeline
│   ├── watch.py       DataWatch — 7-check contract system
│   └── report.py      CleanReport, WatchReport, FixAction
├── pipeline.py        MendPipeline — sklearn-compatible
├── dashboard.py       self-contained HTML dashboard
├── cli.py             CLI (clean / watch / check / score)
├── plugins/           CleanerPlugin, ValidatorPlugin, PluginRegistry
├── integrations/      MLflow, W&B, DVC connectors
└── api.py             unified public API
```

---

## Contributing

```bash
git clone https://github.com/sohaibdevv/puredata.py.git
cd puredata.py
pip install -e ".[dev]"
pytest
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Roadmap

- [x] 9-stage AutoClean pipeline
- [x] 7-check DataWatch contract system
- [x] CLI, dashboard, plugin system
- [x] MLflow, W&B, DVC, sklearn integrations
- [ ] Streaming / chunked cleaning for large files
- [ ] LLM-powered category clustering
- [ ] Spark / Dask backend

---

## License

MIT © [sohaib](https://github.com/sohaibdevv)

```bash
pip install puredatalib
```
