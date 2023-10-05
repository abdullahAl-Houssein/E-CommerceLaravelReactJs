<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['title', 'user_id', 'total_price'];
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(order_details::class);
    }
}
