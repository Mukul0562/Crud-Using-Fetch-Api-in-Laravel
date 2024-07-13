<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// jo bhi import hai vo neeche hai

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

//--------------------------------------------------------//
class Post extends Model
{
    use HasFactory;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}


