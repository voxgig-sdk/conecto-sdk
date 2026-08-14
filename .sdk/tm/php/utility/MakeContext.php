<?php
declare(strict_types=1);

// Conecto SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ConectoMakeContext
{
    public static function call(array $ctxmap, ?ConectoContext $basectx): ConectoContext
    {
        return new ConectoContext($ctxmap, $basectx);
    }
}
