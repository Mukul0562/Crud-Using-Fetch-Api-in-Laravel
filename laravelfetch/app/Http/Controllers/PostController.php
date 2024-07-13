<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


// jo bhi import hai vo neeche hai

use App\Models\User;

use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        $user = $request->user();
        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $user->posts()->save($post);

        return response()->json([
            'success' => 'Post Created Successful',
        ]);

    }

    public function show()
    {
        $posts = Post::with('user')->get();
        return $posts;
    }


    public function delete($id)
    {
        $post = Post::find($id);

        if($post)
        {
            $post->delete();
            return response()->json(['success' => 'Post Successfully Deleted'], 200);
        }
        else
        {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if($post)
        {
            $post->title = $request->title;
            $post->body = $request->body;
            $post->save();
            return response()->json(['success' => 'Post Successfully Updated'], 200);
        }
        else
        {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }
}
