<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role as SpatieRole;
class Role extends Model
{

    use HasFactory, HasRoles;

    use HasFactory;
    protected $fillable=['name'];


    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
