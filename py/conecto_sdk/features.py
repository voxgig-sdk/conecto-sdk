# Conecto SDK feature factory

from conecto_sdk.feature.base_feature import ConectoBaseFeature
from conecto_sdk.feature.debug_feature import ConectoDebugFeature
from conecto_sdk.feature.idempotency_feature import ConectoIdempotencyFeature
from conecto_sdk.feature.metrics_feature import ConectoMetricsFeature
from conecto_sdk.feature.paging_feature import ConectoPagingFeature
from conecto_sdk.feature.ratelimit_feature import ConectoRatelimitFeature
from conecto_sdk.feature.retry_feature import ConectoRetryFeature
from conecto_sdk.feature.test_feature import ConectoTestFeature
from conecto_sdk.feature.timeout_feature import ConectoTimeoutFeature


_FEATURES = {
    "base": lambda: ConectoBaseFeature(),
    "debug": lambda: ConectoDebugFeature(),
    "idempotency": lambda: ConectoIdempotencyFeature(),
    "metrics": lambda: ConectoMetricsFeature(),
    "paging": lambda: ConectoPagingFeature(),
    "ratelimit": lambda: ConectoRatelimitFeature(),
    "retry": lambda: ConectoRetryFeature(),
    "test": lambda: ConectoTestFeature(),
    "timeout": lambda: ConectoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
