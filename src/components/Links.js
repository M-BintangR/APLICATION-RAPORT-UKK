
export const AdminMenu = [
    {
        title: 'Dashboard',
        submenu: true,
        submenuItems: [
            { title: 'Home', link: '/dashboard' },
            { title: 'Profil', link: '/dashboard/profil' },
            { title: 'Data User', link: '/dashboard/data/user' },
            { title: 'Registrasi', link: '/dashboard/data/registrasi' },
        ],
    },
    { title: 'Data Mapel', link: '/dashboard/data/mapel', spacing: true },
    { title: 'Data Guru', link: '/dashboard/data/guru' },
    { title: 'Data Siswa', link: '/dashboard/data/siswa' },
    { title: 'Data Walas', link: '/dashboard/data/walas' },
    { title: 'Data Jurusan', link: '/dashboard/data/jurusan' },
    { title: 'Data Tapel', link: '/dashboard/data/tapel' },
    { title: 'Data Kelas', link: '/dashboard/data/kelas' },
];
