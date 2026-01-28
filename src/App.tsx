import UserForm from "./UserForm";

function App() {
  return (
    <div className="h-full w-full bg-gray-14 flex flex-col items-center py-10 gap-10">
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1 className="text-2xl text-white">User Form</h1>
        <UserForm showTOS={true} isCreating={true} />
      </div>
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1 className="text-2xl text-white">Update User Form</h1>
        <UserForm
          initialValues={{
            name: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
          }}
          isEditing={true}
        />
      </div>
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1 className="text-2xl text-white">Banner User Form</h1>
        <UserForm fields={["email"]} isBanner={true} />
      </div>
    </div>
  );
}

export default App;
