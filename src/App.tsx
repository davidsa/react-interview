import UserForm from "./UserForm";

function App() {
  return (
    <div className="flex flex-col items-center py-10 gap-10">
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1>User Form</h1>
        <UserForm showTOS={true} isCreating={true} />
      </div>
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1>Update User Form</h1>
        <UserForm
          initialValues={{
            name: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            city: "New York",
          }}
          cityAsSelect={false}
          isEditing={true}
        />
      </div>
      <div className="flex flex-col items-center w-2xl gap-5">
        <h1>Banner User Form</h1>
        <UserForm fields={["email"]} isBanner={true} />
      </div>
    </div>
  );
}

export default App;
