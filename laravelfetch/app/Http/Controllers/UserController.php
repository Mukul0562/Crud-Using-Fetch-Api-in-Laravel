<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// jo bhi import hai vo neeche hai

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

//------------------------------------------//

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::check())
        {
            return response()->json([
                'success' => 'Success'
            ]);
        }
        else
        {
            return response()->json([
                'fail' => 'Fail'
            ]);
        }
    }


    public function show()
    {
        $user = User::all();
        return $user;
    }


    public function id($id)
    {
        $user = User::all()->where('id', $id);
        return $user;
    }


    public function name($name)
    {
        $user = User::all()->where('name', $name);
        return $user;
    }


    public function id_name($id, $name)
    {
        $user = User::all()->where('id', $id)->where('name', $name);
        return $user;
    }



    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();


        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json([
            'success' => 'Registration Successfull',
        ]);
    }



    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        $user = User::where('email', $validatedData['email'])->first();
        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid Login Details'
            ], 401);
        }

        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
        return response()->json([
            'access_token' => $token,
        ]);
    }



    function postCreate()
    {
        $id = Auth::id();
        return response()->json([
            'responce' => $id,
        ]);
    }


}
