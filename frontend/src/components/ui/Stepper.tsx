import {
  AnimatePresence,
  motion,
  type Variants,
  type Transition,
} from 'motion/react'
import {
  Children,
  Fragment,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  disableStepIndicators?: boolean
  renderStepIndicator?: (props: {
    step: number
    currentStep: number
    onStepClick: (step: number) => void
  }) => ReactNode
}

interface StepContentWrapperProps {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: ReactNode
  className: string
}

interface SlideTransitionProps {
  children: ReactNode
  direction: number
  onHeightReady: (height: number) => void
}

interface StepProps {
  children: ReactNode
  className?: string
}

interface StepIndicatorProps {
  step: number
  currentStep: number
  onClickStep: (step: number) => void
  disableStepIndicators: boolean
}

interface StepConnectorProps {
  isComplete: boolean
}

const stepTransition: Transition = { duration: 0.34, ease: [0.4, 0, 0.2, 1] }

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  completeButtonText = 'Complete',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [direction, setDirection] = useState(0)
  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)

    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setDirection(1)
    updateStep(totalSteps + 1)
  }

  const { className: backButtonClassName = '', ...restBackButtonProps } =
    backButtonProps
  const { className: nextButtonClassName = '', ...restNextButtonProps } =
    nextButtonProps

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center" {...rest}>
      <div
        className={[
          'w-full rounded-2xl border border-white/80 bg-white/90 shadow-[0_30px_70px_rgba(76,43,168,0.16)] backdrop-blur-md',
          stepCircleContainerClassName,
        ].join(' ')}
      >
        <div
          className={[
            'flex w-full items-center px-5 pb-2 pt-6 sm:px-8',
            stepContainerClassName,
          ].join(' ')}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1

            return (
              <Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </Fragment>
            )
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={['relative overflow-hidden', contentClassName].join(' ')}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={['px-5 pb-6 sm:px-8', footerClassName].join(' ')}>
            <div
              className={[
                'mt-7 flex items-center',
                currentStep !== 1 ? 'justify-between' : 'justify-end',
              ].join(' ')}
            >
              {currentStep !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-bold text-[#6B7280] transition hover:bg-[#F6F5FA] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F0EBFF]',
                    backButtonClassName,
                  ].join(' ')}
                  {...restBackButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                className={[
                  'landing-shine-button rounded-full bg-[#6E41E2] px-5 py-2.5 text-sm font-bold text-white shadow-[0_16px_30px_rgba(110,65,226,0.24)] transition hover:bg-[#5833B5] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C4B5FD]',
                  nextButtonClassName,
                ].join(' ')}
                {...restNextButtonProps}
              >
                {isLastStep ? completeButtonText : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState(0)

  return (
    <motion.div
      className={className}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(height) => setParentHeight(height)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight)
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={stepTransition}
      className="absolute left-0 right-0 top-0"
    >
      {children}
    </motion.div>
  )
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0,
  }),
}

export function Step({ children, className = 'px-5 pt-6 sm:px-8' }: StepProps) {
  return <div className={className}>{children}</div>
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: StepIndicatorProps) {
  const status =
    currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step)
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="relative rounded-full outline-none focus-visible:ring-4 focus-visible:ring-[#F0EBFF]"
      style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}}
      animate={status}
      initial={false}
      aria-label={`Go to step ${step}`}
    >
      <motion.span
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: '#F6F5FA',
            color: '#6B7280',
          },
          active: {
            scale: 1,
            backgroundColor: '#6E41E2',
            color: '#6E41E2',
          },
          complete: {
            scale: 1,
            backgroundColor: '#6E41E2',
            color: '#FFFFFF',
          },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-1 ring-white"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : status === 'active' ? (
          <span className="h-3 w-3 rounded-full bg-white" />
        ) : (
          <span>{step}</span>
        )}
      </motion.span>
    </motion.button>
  )
}

function StepConnector({ isComplete }: StepConnectorProps) {
  return (
    <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded-full bg-[#F0EBFF]">
      <motion.div
        className="absolute left-0 top-0 h-full bg-[#6E41E2]"
        variants={{
          incomplete: { width: 0 },
          complete: { width: '100%' },
        }}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}

function CheckIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
