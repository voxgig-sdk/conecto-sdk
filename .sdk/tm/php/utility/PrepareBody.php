<?php
declare(strict_types=1);

// Conecto SDK utility: prepare_body

class ConectoPrepareBody
{
    public static function call(ConectoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
