exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    // Simulasi data kelas
    const kelasData = ["kelas_10", "kelas_11"];

    // Loop data untuk membuat halaman dinamis
    kelasData.forEach((kelas) => {
        createPage({
            path: `/${kelas}`, // URL-nya
            component: require.resolve("./src/pages/[kelas]/index.jsx"),
            context: { kelas }, // Data yang bisa diakses di komponen
        });
    });
};
