<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
       //get user by token
        $user = $request->user();

        if ($user) {
            return response()->json([
                'user' => $user,
            ], 200);
        }


        return response()->json([
            'message' => 'User not found',
        ], 404);
    }
}
