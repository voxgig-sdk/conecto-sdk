# Conecto SDK utility: make_context

from conecto_sdk.core.context import ConectoContext


def make_context_util(ctxmap, basectx):
    return ConectoContext(ctxmap, basectx)
