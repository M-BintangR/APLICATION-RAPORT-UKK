<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // one to many (kelas)
    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    // one to many (jurusan)
    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }
}