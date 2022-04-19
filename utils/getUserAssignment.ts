import prisma from '../lib/prisma';

const getUserAssignment = async (providerAccountId: string | undefined) => {
  const profile = await prisma.profile.findFirst({
    where: { provider_account_id: providerAccountId },
    select: {
      assignments: {
        select: {
          id: true,
          cohort_id: true,
          cohort: true,
          profile_id: true,
          profile: true,
          role: true,
          curriculum: true,
        },
      },
    },
  });

  return profile?.assignments[0];
};

export default getUserAssignment;
