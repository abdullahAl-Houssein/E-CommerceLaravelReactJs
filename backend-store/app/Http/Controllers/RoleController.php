<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return view('roles.index', compact('roles'));
    }
}
