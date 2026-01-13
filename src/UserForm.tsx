import { FC, useState } from "react";

type FormValues = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
};

type UserFormProps = {
  onSubmit: (values: FormValues) => void;
};

const UserForm: FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, lastname, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 text-sm font-medium">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastname" className="block mb-1 text-sm font-medium">
          Last Name:
        </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block mb-1 text-sm font-medium">
          Phone:
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 text-base bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
