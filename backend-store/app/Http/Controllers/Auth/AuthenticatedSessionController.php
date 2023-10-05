<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        if($request->wantsJson()){
            $token=$request->user()->createToken('register_token');
            $user=$request->user()->name;
            $user_id = $request->user()->id;
            $user_role=$request->user()->roles->pluck('name');
            return response()->json([
                'id' => $user_id,
                'token'=>$token->plainTextToken,
                'username'=>$user,
                'user_role' =>$user_role,
                'message'=>__('successfully')
            ],200);
        }
        $request->session()->regenerate();


        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        // Check if response want json
        if($request->expectsJson()){
            // Delete user tokens
            $state=$request->user()->currentAccessToken()->delete();
            // Check if don successfully or not
            if(!$state){
                return response()->json([
                    'message'=>'logout failed'
                ],550);
            }
            return response()->json([
                'message'=>'logout successfully'
            ],200);
        }
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
