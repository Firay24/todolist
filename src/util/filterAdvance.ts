// Data berdasarkan objek yang diberikan
var tasks = [
  {
    id: "1",
    title: "Mengerjakan Tugas Sekolah",
    description: "Selesaikan tugas matematika",
    completed: false,
    priority: "rendah",
    category: "tugas sekolah",
    deadline: "2023-11-10",
    created: "2023-11-02T01:36:53.945Z",
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
  },
];

function filterSQL(data, filterQuery) {
  return data.filter(function (row) {
    return eval(filterQuery); // Melakukan evaluasi filter query sebagai ekspresi JavaScript
  });
}

// Filter SQL yang ingin Anda terapkan
var sqlFilterQuery =
  "((row.category === 'Embroidery' || row.category === 'Knitting') && row.completed === 'true' || row.priority === 'rendah') && (row.category === 'Tea tasting' && row.completed === 'false' || row.priority === 'sedang')";

// Melakukan filter data dengan query SQL
var filteredTasks = filterSQL(tasks, sqlFilterQuery);

// Menampilkan data yang telah difilter
console.log(filteredTasks);
