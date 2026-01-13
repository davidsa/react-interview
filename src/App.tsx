import UserForm from "./UserForm";

function App() {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex flex-col items-center w-2xl">
        <h1>User Form</h1>
        <UserForm />
      </div>
    </div>
  );
}

export default App;
