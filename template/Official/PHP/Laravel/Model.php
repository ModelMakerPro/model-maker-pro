<?php
/**
* Create For ModelMakerPro By Deboy https://github.com/deboyblog
* {{comment}}
*/
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class {{upperFirstAndDashToCamel name}} extends Model
{
    use SoftDeletes;
    protected $table = '{{name}}';
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $fillable = [{{#fields}}{{#if laravel.fillable}}'{{field}}',{{/if}}{{/fields}}];
    // 关联表配置
    
    {{#fields}}
    {{#if laravel.associateTable}}
    // {{title}}
    public function {{laravel.associateTable}} () {
        return $this->{{laravel.relevance}}('App\\{{upperFirstAndDashToCamel laravel.associateTable}}');
    }
    {{/if}}
    {{/fields}}
}
