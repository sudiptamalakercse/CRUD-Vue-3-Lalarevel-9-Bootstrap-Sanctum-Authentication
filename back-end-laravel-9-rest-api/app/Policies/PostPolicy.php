<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    public function create_post_by_user(User $user)
    {

        if ($user->getTable() == 'users') {
            return true;
        }

    }

    public function update_by_user(User $user, Post $post)
    {
        if ($user->id == $post->user_id) {
            return true;
        }
    }

    public function delete_by_user(User $user, Post $post)
    {
        if ($user->id == $post->user_id) {
            return true;
        }
    }

}
