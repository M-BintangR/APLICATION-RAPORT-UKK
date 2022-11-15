<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // many to one (mapel)
    public function mapel()
    {
        return $this->hasMany(Mapel::class, 'id_mapel');
    }

    // many to one (siswa)
    public function siswa()
    {
        return $this->hasMany(Siswa::class);
    }
}