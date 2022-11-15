<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Walas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // one to many (guru)
    public function guru()
    {
        return $this->belongsTo(Guru::class, 'id_guru', 'id');
    }

    // one to many (kelas)
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'id_kelas', 'id');
    }
}