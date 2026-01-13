import { useState, useEffect, useRef, useMemo } from "react";
import type { FC } from "react";

const fetchCities = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ]);
    }, 5000);
  });
};

const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length === 0) return "";
  if (numbers.length <= 3) return `(${numbers}`;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

const validateEmail = (email: string): boolean => {
  if (!email) return true;
  const parts = email.split("@");
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) return false;
  const domainParts = parts[1].split(".");
  return domainParts.length >= 2 && domainParts[domainParts.length - 1].length > 0;
};

type FormValues = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
};

type UserFormProps = {
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  showTOS?: boolean;
  fields?: ("name" | "lastname" | "email" | "phone" | "city")[];
};

const UserForm: FC<UserFormProps> = ({ onSubmit, initialValues, showTOS, fields }) => {
  const defaultFields: ("name" | "lastname" | "email" | "phone" | "city")[] = ["name", "lastname", "email", "phone", "city"];
  const visibleFields = useMemo(() => fields || defaultFields, [fields]);
  const [name, setName] = useState(initialValues?.name || "");
  const [lastname, setLastname] = useState(initialValues?.lastname || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [phone, setPhone] = useState(initialValues?.phone ? formatPhoneNumber(initialValues.phone) : "");
  const [city, setCity] = useState(initialValues?.city || "");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const citiesFetchedRef = useRef(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (visibleFields.includes("city") && !citiesFetchedRef.current) {
      citiesFetchedRef.current = true;
      setLoadingCities(true);
      fetchCities()
        .then((fetchedCities) => {
          setCities(fetchedCities);
          setLoadingCities(false);
        })
        .catch(() => {
          setLoadingCities(false);
        });
    }
  }, [visibleFields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, lastname, email, phone, city });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {visibleFields.includes("name") && (
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-100">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {visibleFields.includes("lastname") && (
        <div className="mb-4">
          <label htmlFor="lastname" className="block mb-2 text-base font-semibold text-gray-100">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {visibleFields.includes("email") && (
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-base font-semibold text-gray-100">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);
              if (newEmail && !validateEmail(newEmail)) {
                setEmailError("Email must contain @ and a valid domain");
              } else {
                setEmailError("");
              }
            }}
            onBlur={(e) => {
              if (e.target.value && !validateEmail(e.target.value)) {
                setEmailError("Email must contain @ and a valid domain");
              } else {
                setEmailError("");
              }
            }}
            className={`w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-400">{emailError}</p>
          )}
        </div>
      )}

      {visibleFields.includes("phone") && (
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-base font-semibold text-gray-100">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder="(123) 456-7890"
            maxLength={14}
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {visibleFields.includes("city") && (
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2 text-base font-semibold text-gray-100">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loadingCities}
            className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            <option value="">{loadingCities ? "Loading cities..." : "Select a city"}</option>
            {cities.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
      )}

      {showTOS && (
        <div className="mb-4 p-4 bg-gray-800 rounded-md border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-100 mb-2">Terms of Service</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      )}

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
