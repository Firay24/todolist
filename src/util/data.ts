// example tasks data
export const data = {
  "list tasks": [
    {
      id: "1",
      title: "Mengerjakan Tugas Sekolah",
      description: "Selesaikan tugas matematika",
      completed: false,
      priority: "rendah",
      category: "tugas sekolah",
      deadline: "2023-11-10",
      created: "2023-11-02T01:36:53.945Z",
      steps: [
        {
          id: "1",
          desc: "makan",
          completed: true,
        },
        {
          id: "2",
          desc: "minum",
          completed: false,
        },
      ],
    },
    {
      id: "2",
      title: "Belanja Bahan Makanan",
      description: "Beli sayuran dan daging",
      completed: false,
      priority: "sedang",
      category: "tugas rumah",
      deadline: "2023-11-13",
      created: "2023-11-02T01:36:53.945Z",
      steps: [
        {
          id: "1",
          desc: "lari",
          completed: false,
        },
        {
          id: "2",
          desc: "jalan",
          completed: false,
        },
      ],
    },
    {
      id: "3",
      title: "Rapat Proyek",
      description: "Pertemuan dengan tim proyek",
      completed: false,
      priority: "tinggi",
      category: "daftar task kantor",
      deadline: "2023-11-12",
      created: "2023-11-02T01:36:53.945Z",
      steps: [
        {
          id: "1",
          desc: "tidur",
          completed: true,
        },
        {
          id: "2",
          desc: "belajar",
          completed: true,
        },
      ],
    },
    {
      id: "4",
      title: "Rapat Hasil",
      description: "Pertemuan dengan tim proyek",
      completed: true,
      priority: "tinggi",
      category: "daftar task kantor",
      deadline: "2023-11-11",
      created: "2023-11-02T01:36:53.945Z",
      steps: [
        {
          id: "1",
          desc: "bekerja",
          completed: false,
        },
        {
          id: "2",
          desc: "bersantai",
          completed: true,
        },
      ],
    },
  ],
  "list priority": ["rendah", "sedang", "tinggi"],
};

// export const categories = [
//   "tugas sekolah",
//   "tugas rumah",
//   "daftar task kantor",
// ];

export const icons = [
  "AiOutlineAlert",
  "AiOutlineAliwangwang",
  "AiOutlineApartment",
  "AiOutlineAudit",
  "AiOutlineAudio",
  "AiOutlineBook",
];

export const categories = [
  {
    category: "tugas sekolah",
    icon: "BsListTask",
  },
  {
    category: "tugas rumah",
    icon: "BsListTask",
  },
  {
    category: "daftar task kantor",
    icon: "BsListTask",
  },
];
