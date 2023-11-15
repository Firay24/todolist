import { DateTime } from "luxon";

export const notifyUser = (
  notificationText = "Thank you for enabling notification"
) => {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationText);
      }
    });
  }
};

export const scheduleTaskNotifications = (props: { tasks: any }) => {
  const today = DateTime.now().setZone("Asia/Jakarta");
  const notifiedTasks = JSON.parse(localStorage.getItem("notifiedTasks")) || [];
  // const notificationTime = today.set({
  //   hour: 12,
  //   minute: 0,
  //   second: 0,
  //   millisecond: 0,
  // });
  // console.log(props.tasks);

  props.tasks &&
    props.tasks.map((task) => {
      const deadline = DateTime.fromISO(task.deadline).setZone("Asia/Jakarta");
      if (deadline.hasSame(today, "day") && !notifiedTasks.includes(task.id)) {
        const options = {
          body: `Tugas dengan judul: ${task.title}`,
        };

        setTimeout(() => {
          const notification = new Notification("Todo list App", options);
          notification.onclick = () => {
            window.open("http://localhost:5173");
          };

          // Tandai tugas sebagai sudah diberi notifikasi
          notifiedTasks.push(task.id);
          localStorage.setItem("notifiedTasks", JSON.stringify(notifiedTasks));
        }, 10000); // Menggunakan timeout yang besar agar notifikasi tidak tampil secara langsung
      }
    });
};
