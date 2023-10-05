<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersWithRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء مستخدم جديد
        $user = new User();
        $user->name = 'Abdullah';
        $user->email = 'abdullah22@gmail.com';
        $user->password = Hash::make('12345678');
        $user->save();

        // جلب الأدوار التي تريد تعيينها للمستخدم
        $roles = ['admin', 'editor'];

        foreach ($roles as $roleName) {
            // ابحث عن الدور باستخدام اسمه
            $role = Role::where('name', $roleName)->first();

            if ($role) {
                // اضف الدور للمستخدم
                $user->roles()->attach($role);
            }
        }
    }
}
