export default [
  {
    path: "/notes/create",
    name: "notes:create",
    component: () => import("@/views/notes/CreateNotes.vue"),
    meta: { public: false },
  },
  {
    path: "/notes/",
    name: "notes:list",
    component: () => import("@/views/notes/NoteList.vue"),
    meta: { public: false },
  },
];
