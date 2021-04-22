import { useEffect, useState } from 'react';
import { setUserState, getUserState } from './actions';

export interface KnowledgeBlockData {
    question: {
        id: string
        text: string;
        media: {
            type: 'image';
            url: string;
        }
    };
    answers: {
        id: string
        text: string;
        isCorrect: boolean;
    }[];
    feedback: string;
  }

export const Media = (props: { url: string }): JSX.Element => {
    const { url } = props;

    return (
       <img
            src={url}
            loading='lazy'
            style={{
                width: '100%'
            }}
        />
    );
}

export interface ChoiceListProps {
    data: {
        id: string;
        text: string;
        selected: boolean;
    }[];
    onClick: (id: string) => void;
    submitted: boolean;
}

export const ChoiceList = ({ data, onClick, submitted }: ChoiceListProps): JSX.Element => {
    return (
        <div>
            {data.map(choice => <ChoiceItem id={choice.id} key={choice.id} text={choice.text} selected={choice.selected} onClick={onClick} clickable={!submitted} /> )}
        </div>
    );
}

export const ChoiceItem = (props: { id: string, text: string, selected: boolean, onClick: (id: string) => void, clickable: boolean }): JSX.Element => {
    return (
        <div style={{ minHeight: 75, borderRadius: '2px' }} className={`row ${props.clickable && 'line-hoverable'}`} onClick={() => props.clickable && props.onClick(props.id)}>
            <div style={{ paddingTop: '3.5%', fontSize: 16 }} className='col-md-2' > <input readOnly type='radio' checked={props.selected} id={props.id} name={props.id} /> </div>
            <div style={{ paddingTop: '3.5%', fontSize: 16, textAlign: 'left' }} className='col-md-5' >{props.text}</div>
        </div>
    );
}


export const BinaryFeedbackDisplay = ({ success, message }: { success: boolean, message: string }): JSX.Element => {
    return <div style={{ backgroundColor: '#f2f2f2', borderRadius: '3px', padding: '5%' }} >
        {success ? <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z"/>
        </svg> 
        : 
        <svg 
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/>
        </svg>}
        <h5 className='heavy-font' style={{ margin: 0, paddingTop: '1%' }} >{success ? 'Correct' : 'Incorrect'}</h5>
        <br />
        <br />
        <h5 className='light-font'>{message}</h5>
    </div>
}

export const SubmitButton = ({ onClick, clickable }: { onClick: () => void, clickable: boolean }): JSX.Element => {
    return  <button 
                style={{
                    maxWidth: '50%',
                    minHeight: 40,
                    minWidth: 130,
                    border: 'none', 
                    borderRadius: '5px',
                    outline: 0
                }}
                value='Submit'
                onClick={() => onClick()}
                disabled={!clickable}
            >Submit</button>
}

export const ResetButton = ({ onClick, resetText }: { onClick: () => void, resetText: string }): JSX.Element => {
    return (
        <div className='item-hoverable opaqe-hover' style={{ margin: 'auto' }} onClick={() => onClick()} >
            <h5 className='heavy-font' style={{ padding: 0, margin: 0, fontSize: 13 }}>{resetText}</h5>
            <br />
            <svg
                height="15pt"
                viewBox="0 -1 394 394"
                width="15pt"
                xmlns="http://www.w3.org/2000/svg">
                    <path d="m195.742188 14c31.976562 0 63.992187 9.066406 92.585937 26.226562 20.054687 12.054688 37.832031 27.546876 52.515625 45.769532l-53.65625-1.769532-.460938 13.992188 67.835938 2.238281c3.863281.125 7.097656-2.902343 7.226562-6.765625 0-.15625 0-.308594 0-.460937l-2.238281-67.835938-13.992187.460938 1.507812 45.734375c-14.789062-17.082032-32.179687-31.71875-51.535156-43.367188-30.769531-18.464844-65.277344-28.222656-99.789062-28.222656-55.140626 0-105.972657 22.734375-143.128907 64.019531-32.945312 36.605469-52.613281 85.847657-52.613281 131.722657h14c0-42.511719 18.324219-88.25 49.019531-122.355469 34.464844-38.296875 81.601563-59.386719 132.722657-59.386719zm0 0"/>
                    <path d="m330.980469 318.097656c-34.464844 38.300782-81.597657 59.386719-132.722657 59.386719-31.976562 0-63.992187-9.066406-92.585937-26.222656-20.054687-12.058594-37.832031-27.550781-52.515625-45.773438l53.65625 1.773438.460938-13.996094-67.835938-2.234375c-1.9375-.078125-3.816406.664062-5.179688 2.042969-1.371093 1.371093-2.109374 3.246093-2.046874 5.183593l2.238281 67.835938 13.992187-.460938-1.507812-45.734374c14.789062 17.078124 32.179687 31.714843 51.535156 43.367187 30.769531 18.460937 65.277344 28.21875 99.789062 28.21875 55.140626 0 105.972657-22.734375 143.128907-64.019531 32.945312-36.605469 52.613281-85.847656 52.613281-131.722656h-14c0 42.511718-18.324219 88.253906-49.019531 122.355468zm0 0"/>
            </svg>
        </div>
    )
}

export interface KnowledgeBlockUserState {
    isCorrectAnswer: boolean;
    selectedOption: string;
    isSubmittedState: boolean;
}

export const KnowledgeBlock = (props: KnowledgeBlockData): JSX.Element => {
    const [state, setState] = useState<KnowledgeBlockUserState>({
        isCorrectAnswer: false,
        selectedOption: '',
        isSubmittedState: false
    });

    useEffect(() => {
        getUserState()
        .then(data => {
            setState({
                ...data
            });
        })
        .catch(console.log)
    }, [])

    useEffect(() => {
        //On each state item update, it is persisted to the API
        //Not an ideal solution. Would be best to call this only once, when the page is refreshed / closed
        persistUserState()
    }, [Object.values(state)]);

    const choiceListOnClick = (selectedId: string): void => {
        setState(prevState => {
            return {
                ...prevState,
                isCorrectAnswer: selectedId === (props.answers.find(answer => answer.isCorrect === true)!.id),
                selectedOption: selectedId
            }
        });
    }

    const persistUserState = () => {
        setUserState(state)
        .catch(console.log)
    }

    const onSubmit = () => {
        setState(prevState => {
            return {
                ...prevState,
                isSubmittedState: true
            }
        });
    }
    
    const onReset = () => {
        setState(() => {
            return {
                selectedOption: '',
                isCorrectAnswer: false,
                isSubmittedState: false,
            }
        });
    }

    return (
        <div className='light-shadow light-padded-block' style={{ minWidth: '35%', minHeight: '100%', maxWidth: '50%', color: 'black', margin: 'auto' }}>
            <h3 className='light-font' style={{ textAlign: 'left' }} >{props.question.text}</h3>
            <Media url={props.question.media!.url} />
            <br />
            <hr />
            <ChoiceList 
                data={props.answers.map(answer => {
                    return {
                        text: answer.text,
                        selected: (state.selectedOption === answer.id),
                        id: answer.id
                    }
                })}
                onClick={choiceListOnClick}
                submitted={state.isSubmittedState}
            />
            <br />

            <div style={{ display: state.isSubmittedState ? 'block' : 'none' }} >
                <BinaryFeedbackDisplay success={state.isCorrectAnswer} message={props.feedback} />
                <br />
                <ResetButton resetText='Take Again' onClick={onReset} />
            </div>


            <div style={{ display: state.isSubmittedState ? 'none' : 'block' }} >
                <SubmitButton clickable={!!state.selectedOption} onClick={onSubmit} />
            </div>
        </div>
    );
}

