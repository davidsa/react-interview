import { useState, useEffect, useRef, useMemo } from "react";
import type { FC } from "react";

type FormValues = {
  name: string;
  lastname: string;
  email: string;
  city: string;
};

type UserFormProps = {
  initialValues?: FormValues;
  showTOS?: boolean;
  fields?: ("name" | "lastname" | "email" | "city")[];
  cityAsSelect?: boolean;
  isCreating?: boolean;
  isEditing?: boolean;
  isBanner?: boolean;
};

const UserForm: FC<UserFormProps> = ({
  initialValues,
  showTOS,
  fields,
  cityAsSelect = true,
  isCreating = false,
  isEditing = false,
  isBanner = false,
}) => {
  const defaultFields: ("name" | "lastname" | "email" | "city")[] = [
    "name",
    "lastname",
    "email",
    "city",
  ];
  const visibleFields = useMemo(() => fields || defaultFields, [fields]);
  const [name, setName] = useState(initialValues?.name || "");
  const [lastname, setLastname] = useState(initialValues?.lastname || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [city, setCity] = useState(initialValues?.city || "");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const citiesFetchedRef = useRef(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (visibleFields.includes("city") && cityAsSelect && !citiesFetchedRef.current) {
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
  }, [visibleFields, cityAsSelect]);

  const handleCancel = () => {
    console.log("cancel");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, lastname, email, city };
    if (isCreating) {
      createUser(formData);
    } else if (isEditing) {
      updateUser(formData);
    } else if (isBanner) {
      alert("Banner was submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {visibleFields.includes("name") && (
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-base font-semibold text-gray-100"
          >
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
          <label
            htmlFor="lastname"
            className="block mb-2 text-base font-semibold text-gray-100"
          >
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
          {!isBanner && (
            <label
              htmlFor="email"
              className="block mb-2 text-base font-semibold text-gray-100"
            >
              Email
            </label>
          )}
          {isBanner ? (
            <div className="flex gap-2">
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
                placeholder="Enter your email"
                className={`flex-1 px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${emailError ? "border-red-500" : "border-gray-300"
                  }`}
              />
              <button
                type="submit"
                className="py-2.5 px-6 text-base bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
              >
                Submit
              </button>
            </div>
          ) : (
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
              className={`w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${emailError ? "border-red-500" : "border-gray-300"
                }`}
            />
          )}
          {emailError && (
            <p className="mt-1 text-sm text-red-400">{emailError}</p>
          )}
        </div>
      )}

      {visibleFields.includes("city") && (
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block mb-2 text-base font-semibold text-gray-100"
          >
            City
          </label>
          {cityAsSelect ? (
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loadingCities}
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingCities ? "Loading cities..." : "Select a city"}
              </option>
              {cities.map((cityOption) => (
                <option key={cityOption} value={cityOption}>
                  {cityOption}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      )}

      {showTOS && (
        <div className="mb-4 p-4 bg-gray-800 rounded-md border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-100 mb-2">
            Terms of Service
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      )}

      {isEditing ? (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-2.5 px-4 text-base bg-gray-600 text-white border-none rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 text-base bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      ) : !isBanner ? (
        <button
          type="submit"
          className="w-full py-2.5 px-4 text-base bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      ) : null}
    </form>
  );
};

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

const createUser = (userData: FormValues): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Creating user:", userData);
      resolve();
    }, 1000);
  });
};

const updateUser = (userData: FormValues): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Updating user:", userData);
      resolve();
    }, 1000);
  });
};

const validateEmail = (email: string): boolean => {
  if (!email) return true;
  const parts = email.split("@");
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0)
    return false;
  const domainParts = parts[1].split(".");
  return (
    domainParts.length >= 2 && domainParts[domainParts.length - 1].length > 0
  );
};

export default UserForm;
