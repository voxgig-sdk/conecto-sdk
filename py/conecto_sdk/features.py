# Conecto SDK feature factory

from conecto_sdk.feature.base_feature import ConectoBaseFeature
from conecto_sdk.feature.test_feature import ConectoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ConectoBaseFeature(),
        "test": lambda: ConectoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
