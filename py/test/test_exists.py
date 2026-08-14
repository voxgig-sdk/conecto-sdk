# Conecto SDK exists test

import pytest
from conecto_sdk import ConectoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ConectoSDK.test(None, None)
        assert testsdk is not None
