<?php
declare(strict_types=1);

// Conecto SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ConectoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ConectoBaseFeature();
            case "test":
                return new ConectoTestFeature();
            default:
                return new ConectoBaseFeature();
        }
    }
}
