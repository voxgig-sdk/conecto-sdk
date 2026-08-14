<?php
declare(strict_types=1);

// Conecto SDK exists test

require_once __DIR__ . '/../conecto_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ConectoSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
