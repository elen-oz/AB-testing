import { useEffect, useState } from 'react';

type FormDataType = {
  variant: 'variantA' | 'variantB';
  userName: string;
  userSelect: 'dogs' | 'cats' | 'allergic' | '';
};

const App = () => {
  const initialFormData: FormDataType = {
    variant: 'variantA',
    userName: '',
    userSelect: '',
  };
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [userResponse, setUserResponse] = useState<string | null>(null);

  let randomNumber: number;

  useEffect(() => {
    randomNumber = Math.random();

    if (randomNumber < 0.6) {
      setFormData({ ...formData, variant: 'variantA' });
    } else {
      setFormData({ ...formData, variant: 'variantB' });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    const nameAnswer =
      formData.userName.split(' ').join('') === ''
        ? 'ANON'
        : formData.userName.charAt(0).toUpperCase() +
          formData.userName.slice(1);

    let petAnswer: string;

    if (formData.userSelect === 'allergic') {
      petAnswer = `you are allergic 🙁`;
    } else if (formData.userSelect === 'dogs') {
      petAnswer = `you are DOG-person 🐶`;
    } else if (formData.userSelect === 'cats') {
      petAnswer = `you are cat-person 🐱`;
    } else {
      petAnswer = `you don't chose an answer`;
    }

    setUserResponse(`Your are ${nameAnswer} and ${petAnswer}`);
  };

  const clearForm = () => {
    // todo: clear form code here;
    console.log('Data was removed!');
  };

  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-4xl font-bold my-4'>{`<A/B Testing>`}</h1>

      <section>
        <h2 className='text-2xl text-center my-2'>Personality test</h2>

        <p className='max-w-[23rem] text-sm leading-6 text-gray-400'>
          All your entered data is confidential, however, if you want to delete
          your data,{' '}
          <a className='underline' onClick={clearForm}>
            click here
          </a>
        </p>

        <form onSubmit={onSubmitHandle}>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Let's see what kind of person you are.
          </p>

          <div className='mt-5 grid grid-cols-1 gap-y-4'>
            <div className='sm:col-span-3'>
              <input
                type='text'
                name='userName'
                id='userName'
                required
                onChange={handleChange}
                placeholder='Your name'
                className='mb-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <fieldset>
            {formData.variant === 'variantA' ? (
              <>
                <legend className='text-sm font-semibold leading-6 text-gray-900 my-4'>
                  Are you a dog person or a cat person?
                </legend>

                <div className='space-y-2'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='dogs'
                      value='dogs'
                      checked={formData['userSelect'] === 'dogs'}
                      onChange={handleChange}
                      name='userSelect'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-gray-600'
                    />
                    <label
                      htmlFor='dogs'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Dogs of course, they're so clever!
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='cats'
                      value='cats'
                      checked={formData['userSelect'] === 'cats'}
                      onChange={handleChange}
                      name='userSelect'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-gray-600'
                    />
                    <label
                      htmlFor='cats'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      There's nothing like the purr of a cat!
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='none'
                      value='allergic'
                      checked={formData['userSelect'] === 'allergic'}
                      onChange={handleChange}
                      name='userSelect'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-gray-600'
                    />
                    <label
                      htmlFor='none'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      I'm allergic.
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className='mt-6 space-y-6 flex items-center gap-x-3'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='userSelect'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Are you a dog person or a cat person?
                  </label>
                  <select
                    onChange={handleChange}
                    id='userSelect'
                    name='userSelect'
                    required
                    className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm'
                  >
                    <option>--- select option ---- </option>
                    <option value='dogs'>
                      DOGS of course, they're so clever!
                    </option>
                    <option value='cats'>
                      There's nothing like the purr of a CAT!
                    </option>
                    <option value='allergic'>I'm allergic.</option>
                  </select>
                </div>
              </div>
            )}
          </fieldset>

          <div className='mt-6 flex items-center justify-center'>
            <button
              type='submit'
              className={`rounded-md ${
                formData.variant === 'variantA'
                  ? 'bg-indigo-600'
                  : 'bg-emerald-600'
              } px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ${
                formData.variant === 'variantA'
                  ? 'hover:bg-indigo-500'
                  : 'hover:bg-emerald-500'
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400`}
            >
              {formData.variant === 'variantA' ? 'Save' : 'Submit'}
            </button>
          </div>
        </form>
      </section>

      <section>
        {userResponse && (
          <>
            <h2 className='mt-6 mb-2 text-2xl text-center my-2'>
              Your results:
            </h2>
            <p className='max-w-[23rem] text-sm leading-6 text-gray-600'>
              {userResponse}
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default App;
