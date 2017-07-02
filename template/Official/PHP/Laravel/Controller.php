<?php
/**
* Create For ModelMakerPro By Deboy https://github.com/deboyblog
* {{comment}}
*/
namespace App\Http\Controllers\Client;
use App\\{{upperFirstAndDashToCamel name}};
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class {{upperFirstAndDashToCamel name}}Controller extends Controller
{
    // 根据查询条件(可选)获取所有{{comment}}的记录
    public function findAll () {
        $query = request('query');
        if ($query) {
            $data = {{upperFirstAndDashToCamel name}}::with([{{#fields}}{{#if laravel.associateTable}}'{{laravel.associateTable}}', {{/if}}{{/fields}}])->where('deleted_at', '=', '')
            {{#fields}}
            {{#if laravel.searchable}}
            ->orWhere('{{field}}', 'like', '%' . $query . '%')
            {{/if}}
            {{/fields}}
            ->orderBy(request('sort'))            
            ->paginate(request('limit'));
        }else{
            $data = {{upperFirstAndDashToCamel name}}::with([{{#fields}}{{#if laravel.associateTable}}'{{laravel.associateTable}}', {{/if}}{{/fields}}])->where(request())
            ->orderBy(request('sort'))
            ->paginate(request('limit'));
        }
        return ['code' => 200, 'data' => $data];
    }
    // 根据索引获取单条记录
    public function select () {
        return ['code' => 200, 'data' => {{upperFirstAndDashToCamel name}}::with([{{#fields}}{{#if laravel.associateTable}}'{{laravel.associateTable}}', {{/if}}{{/fields}}])->find(request('id'))];
    }
    // 新增或者保存原有的数据
    public function save (Request $request) {
        if ($request->input('id')) {
            $result = {{upperFirstAndDashToCamel name}}::updateOrCreate(['id' => $request->input('id')], $request->input());
        }else{
            $result = {{upperFirstAndDashToCamel name}}::create($request->input());
        }
        return ['code' => 200, 'data' => $result];
    }
    // 删除某条数据 软删
    public function delete () {
        $result = {{upperFirstAndDashToCamel name}}::destroy(request('id'));
        return ['code' => 200, 'data' => $result];
    }
    // 批量删除数据
    public function deleteBatch () {
        $ids = request('ids');
        return ['code' => 200, 'data' => {{upperFirstAndDashToCamel name}}::destroy(explode(',',$ids))];
    }
}
