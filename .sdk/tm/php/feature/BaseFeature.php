<?php
declare(strict_types=1);

// Conecto SDK base feature

class ConectoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ConectoContext $ctx, array $options): void {}
    public function PostConstruct(ConectoContext $ctx): void {}
    public function PostConstructEntity(ConectoContext $ctx): void {}
    public function SetData(ConectoContext $ctx): void {}
    public function GetData(ConectoContext $ctx): void {}
    public function GetMatch(ConectoContext $ctx): void {}
    public function SetMatch(ConectoContext $ctx): void {}
    public function PrePoint(ConectoContext $ctx): void {}
    public function PreSpec(ConectoContext $ctx): void {}
    public function PreRequest(ConectoContext $ctx): void {}
    public function PreResponse(ConectoContext $ctx): void {}
    public function PreResult(ConectoContext $ctx): void {}
    public function PreDone(ConectoContext $ctx): void {}
    public function PreUnexpected(ConectoContext $ctx): void {}
}
