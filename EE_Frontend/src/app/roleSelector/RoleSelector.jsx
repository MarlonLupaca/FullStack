'use client';

import { User, Shield, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const router = useRouter();

  const roles = [
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Gestiona todo el sistema',
      icon: Shield,
      path: '/admin',
      bgColor: '#e0f2f1',
      textColor: '#004d40',
      iconColor: '#00796b',
      borderColor: '#80cbc4',
      shadowColor: 'rgba(0, 121, 107, 0.15)',
    },
    {
      id: 'client',
      title: 'Cliente',
      description: 'Accede a servicios',
      icon: User,
      path: '/',
      bgColor: '#e0f7fa',
      textColor: '#006064',
      iconColor: '#0097a7',
      borderColor: '#80deea',
      shadowColor: 'rgba(0, 151, 167, 0.15)',
    },
    {
      id: 'employee',
      title: 'Empleado',
      description: 'Gestiona operaciones',
      icon: Briefcase,
      path: '/admin',
      bgColor: '#e8f5e9',
      textColor: '#2e7d32',
      iconColor: '#43a047',
      borderColor: '#a5d6a7',
      shadowColor: 'rgba(67, 160, 71, 0.15)',
    },
  ];

  const handleRoleSelect = (roleId) => {
    if (isAnimating) return;

    setSelectedRole(roleId);
    setIsAnimating(true);

    const role = roles.find((r) => r.id === roleId);

    setTimeout(() => {
      if (role && role.path) {
        router.push(role.path);
      } else {
        router.push('/');
      }

      setIsAnimating(false);
      setSelectedRole(null);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0f9f8] to-[#e6f3f0] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-6xl">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[#2d3748]">
            Selecciona tu
            <span className="bg-gradient-to-r from-[#00796b] to-[#4caf50] bg-clip-text text-transparent"> Rol</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-[#4a5568]">
            Elige el tipo de usuario que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            const shouldAnimate = isAnimating && isSelected;

            return (
              <div
                key={role.id}
                className={`
                  relative bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center
                  cursor-pointer transition-all duration-300 ease-out
                  hover:shadow-lg hover:scale-[1.02]
                  ${shouldAnimate ? 'scale-[1.05] shadow-xl animate-pulse-subtle' : 'shadow-md'}
                  border-2 ${isSelected ? `border-[${role.iconColor}]` : 'border-transparent'}
                `}
                style={{
                  backgroundColor: role.bgColor,

                  boxShadow: isSelected ? `0 15px 30px -8px ${role.shadowColor}` : '0 10px 20px -5px rgba(0,0,0,0.05)',
                }}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center mb-6
                    transition-all duration-300 ease-out
                    ${shouldAnimate ? 'scale-110' : ''}
                  `}
                  style={{
                    backgroundColor: role.iconColor,
                    boxShadow: `0 8px 15px -4px ${role.shadowColor}`,
                  }}
                >
                  <IconComponent size={36} className="text-white" />
                </div>
                <h3
                  className={`text-2xl font-semibold mb-2 transition-colors duration-300`}
                  style={{ color: role.textColor }}
                >
                  {role.title}
                </h3>
                <p className={`text-base transition-colors duration-300`} style={{ color: role.textColor }}>
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
