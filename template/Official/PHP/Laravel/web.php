<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Admin
Route::group(['prefix' => 'admin', 'middleware' => ['adminAuth']], function () {
    {{#tables}}
    Route::any('/{{dashToCamel name}}/findAll', 'Admin\\{{upperFirstAndDashToCamel name}}Controller@findAll');
    Route::any('/{{dashToCamel name}}/select', 'Admin\\{{upperFirstAndDashToCamel name}}Controller@select');
    Route::any('/{{dashToCamel name}}/save', 'Admin\\{{upperFirstAndDashToCamel name}}Controller@save');
    Route::any('/{{dashToCamel name}}/delete', 'Admin\\{{upperFirstAndDashToCamel name}}Controller@delete');
    Route::any('/{{dashToCamel name}}/deleteBatch', 'Admin\\{{upperFirstAndDashToCamel name}}Controller@deleteBatch');
    {{/tables}}
});
// client
Route::group(['prefix' => 'client', 'middleware' => ['userAuth']], function () {
    {{#tables}}
    Route::any('/{{dashToCamel name}}/findAll', 'Client\\{{upperFirstAndDashToCamel name}}Controller@findAll');
    Route::any('/{{dashToCamel name}}/insert', 'Client\\{{upperFirstAndDashToCamel name}}Controller@deleteBatch');
    Route::any('/{{dashToCamel name}}/select', 'Client\\{{upperFirstAndDashToCamel name}}Controller@select');
    Route::any('/{{dashToCamel name}}/save', 'Client\\{{upperFirstAndDashToCamel name}}Controller@save');
    Route::any('/{{dashToCamel name}}/delete', 'Client\\{{upperFirstAndDashToCamel name}}Controller@delete');
    Route::any('/{{dashToCamel name}}/deleteBatch', 'Client\\{{upperFirstAndDashToCamel name}}Controller@deleteBatch');
    {{/tables}}
});