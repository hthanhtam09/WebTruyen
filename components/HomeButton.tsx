import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeButton = ({ title, navigate }: { title: string; navigate: string }) => {
  const router = useRouter();

  const goToBackHomePage = () => {
    router.push(`/${navigate === 'home' ? '' : navigate}`);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      className="text-foreground border-white border rounded-full flex items-center justify-center
         fixed top-4 left-4 w-fit self-start z-[9999] cursor-pointer
        "
      aria-label={'home'}
      onClick={goToBackHomePage}
    >
      <span className="relative w-14 h-14 p-4 hover:text-light dark:hover:text-dark">
        <Home className="w-full h-auto text-light dark:text-dark" strokeWidth={1.5} />

        <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />

        <span className="absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-white text-sm rounded-md shadow-lg whitespace-nowrap">
          {title}
        </span>
      </span>
      <span className="sr-only">Go to Home Page</span>
    </motion.div>
  );
};

export default HomeButton;
