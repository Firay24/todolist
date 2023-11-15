export const getCategoryInfo = (data: any) => {
  const uniqueCategories = [...new Set(data.map((item: any) => item.category))];
  const categoryInfo = uniqueCategories.map((category) => {
    const categoryTasks = data.filter(
      (item: any) => item.category === category
    );
    const totalTasks = categoryTasks.length;
    const completedTasks = categoryTasks.filter(
      (item: any) => item.completed
    ).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const urgent = categoryTasks.filter(
      (item: any) => item.priority === "tinggi"
    );
    const medium = categoryTasks.filter(
      (item: any) => item.priority === "sedang"
    );
    const easy = categoryTasks.filter(
      (item: any) => item.priority === "rendah"
    );

    return {
      category: category,
      countCategory: totalTasks,
      progress: progress,
      priority: {
        tinggi: urgent.length,
        sedang: medium.length,
        rendah: easy.length,
      },
    };
  });

  return categoryInfo;
};
