export default [
  {
    path: "/notes/create",
    name: "notes:create",
    component: () => import("@/views/notes/CreateNotes.vue"),
    meta: { public: false },
  },
];
