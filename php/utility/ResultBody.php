<?php
declare(strict_types=1);

// Conecto SDK utility: result_body

class ConectoResultBody
{
    public static function call(ConectoContext $ctx): ?ConectoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
