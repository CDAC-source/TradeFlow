let listeners = [];
let notifications = [];

const notify = () => {
  listeners.forEach(l => l([...notifications]));
};

export const notificationStore = {
  subscribe(fn) {
    listeners.push(fn);
    fn([...notifications]);

    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  },

  add({ message, type }) {
    notifications.unshift({
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleString()
    });
    notify();
  },

  remove(id) {
    notifications = notifications.filter(n => n.id !== id);
    notify();
  },

  clear() {
    notifications = [];
    notify();
  }
};
