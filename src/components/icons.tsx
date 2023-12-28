export const TwitterIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.9218 2.48292C20.1465 2.85968 19.324 3.10714 18.4817 3.21703C19.3692 2.63628 20.0333 1.72234 20.3503 0.6456C19.5162 1.1873 18.6033 1.56862 17.6514 1.77297C17.0682 1.09372 16.3118 0.621822 15.4804 0.418468C14.649 0.215115 13.7809 0.289684 12.9887 0.63251C12.1965 0.975336 11.5167 1.57059 11.0376 2.3411C10.5584 3.11161 10.302 4.02181 10.3015 4.95367C10.3011 5.31012 10.3378 5.66548 10.4108 6.01287C8.72144 5.92026 7.06877 5.44012 5.56007 4.60363C4.05136 3.76713 2.72033 2.59298 1.65338 1.15737C1.11014 2.18044 0.943681 3.39146 1.18788 4.54402C1.43207 5.69658 2.06857 6.70408 2.96785 7.3615C2.29292 7.33869 1.63278 7.13947 1.04263 6.78051V6.83924C1.04285 7.91228 1.38236 8.95222 2.00358 9.78271C2.6248 10.6132 3.48951 11.1831 4.45107 11.3959C4.08612 11.5046 3.70947 11.5593 3.33122 11.5584C3.06294 11.5584 2.79524 11.531 2.53161 11.4766C2.80319 12.3997 3.33165 13.2069 4.04313 13.7855C4.75461 14.364 5.61356 14.6849 6.49995 14.7035C4.71829 16.2296 2.45646 16.9215 0.209473 16.6278C2.03544 17.9082 4.14286 18.6272 6.3105 18.7094C8.47813 18.7916 10.626 18.234 12.5287 17.095C14.4313 15.9561 16.0186 14.2779 17.1237 12.2366C18.2289 10.1952 18.8112 7.86614 18.8096 5.49375C18.8096 5.2924 18.8051 5.0921 18.7962 4.89285C19.63 4.23403 20.3497 3.41796 20.9218 2.48292Z"
        fill="#2DAAE1"
      />
    </svg>
  );
};

export const FacebookIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="50"
      viewBox="0 0 13 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.4407 12.8547L12.0374 8.72297H8.30706V6.03751C8.28074 5.72869 8.32013 5.41757 8.42232 5.12714C8.5245 4.83672 8.68707 4.57436 8.89756 4.35976C9.10804 4.14516 9.36124 3.98378 9.6384 3.88743C9.91557 3.79108 10.2097 3.76225 10.4988 3.8032H12.1958V0.284038C11.1998 0.11318 10.1933 0.0199477 9.18451 0.00512695C6.11212 0.00512695 4.1053 1.98418 4.1053 5.56947V8.72095H0.688965V12.8527H4.1053V22.8463C4.80034 22.9619 5.50292 23.0196 6.20642 23.0188C6.90989 23.0186 7.61191 22.9609 8.30706 22.8463V12.8527L11.4407 12.8547Z"
        fill="#1977F3"
      />
    </svg>
  );
};

export const InstagramLogo = ({ className }: { className?: string }) => {
  const igFirstGradientId =
    'ig-first-gradient-' + Math.random().toString(36).substring(2, 15);
  const igSecondGradientId =
    'ig-second-gradient-' + Math.random().toString(36).substring(2, 15);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3364.7 3364.7"
      style={{ display: 'block' }}
      className={className}
    >
      <defs>
        <radialGradient
          id={igFirstGradientId}
          cx="217.76"
          cy="3290.99"
          r="4271.92"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".09" stop-color="#fa8f21" />
          <stop offset=".78" stop-color="#d82d7e" />
        </radialGradient>
        <radialGradient
          id={igSecondGradientId}
          cx="2330.61"
          cy="3182.95"
          r="3759.33"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".64" stop-color="#8c3aaa" stopOpacity="0" />
          <stop offset="1" stop-color="#8c3aaa" />
        </radialGradient>
      </defs>
      <path
        d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
        fill={`url(#${igFirstGradientId})`}
      />
      <path
        d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
        fill={`url(#${igSecondGradientId})`}
      />
      <path
        d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
        fill="#ffffff"
      />
    </svg>
  );
};
