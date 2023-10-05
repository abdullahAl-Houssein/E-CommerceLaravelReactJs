@extends('layouts.app')

@section('content')
    <h1>قائمة الأدوار</h1>

    <ul>
        @foreach ($roles as $role)
            <li>
                @if ($role)
                    {{ $role->name }}
                @else
                    لا يوجد دور
                @endif
            </li>
        @endforeach
    </ul>
@endsection
