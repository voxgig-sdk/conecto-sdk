<?php
declare(strict_types=1);

// Conecto SDK utility: result_headers

class ConectoResultHeaders
{
    public static function call(ConectoContext $ctx): ?ConectoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
