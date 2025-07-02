// components/Buttons.js
import React from 'react';

// ========== BOTÃO BASE ==========
const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'btn';
    const variantClasses = {
        primary: 'btn-primary',
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
        secondary: 'btn-secondary'
    };

    const classes = [
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        disabled ? 'btn-disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// ========== BOTÕES DE AÇÃO ==========
export const LoginButton = ({ onClick, disabled = false }) => (
    <Button variant="primary" onClick={onClick} disabled={disabled}>
        Entrar
    </Button>
);

export const ViewResultsButton = ({ onClick }) => (
    <Button variant="warning" onClick={onClick}>
        Ver Resultados
    </Button>
);

export const NextStepButton = ({ onClick, isLastStep = false }) => (
    <Button variant="success" onClick={onClick}>
        {isLastStep ? 'Revisar Votos' : 'Próximo Cargo'}
    </Button>
);

export const BackButton = ({ onClick }) => (
    <Button variant="danger" onClick={onClick}>
        ← Voltar e Alterar
    </Button>
);

export const ConfirmVotesButton = ({ onClick }) => (
    <Button variant="success" onClick={onClick}>
        ✓ Confirmar Votos
    </Button>
);

export const NextVoterButton = ({ onClick }) => (
    <Button variant="primary" onClick={onClick}>
        Próximo Eleitor
    </Button>
);

export const ContinueVotingButton = ({ onClick }) => (
    <Button variant="primary" onClick={onClick}>
        Continuar Votação
    </Button>
);

export const NewElectionButton = ({ onClick }) => (
    <Button variant="danger" onClick={onClick}>
        Nova Eleição
    </Button>
);

// ========== BOTÕES DE VOTAÇÃO ==========
export const CandidateButton = ({
    candidato,
    isSelected = false,
    onClick
}) => (
    <div
        className={`candidate ${isSelected ? 'selected' : ''}`}
        onClick={() => onClick(candidato.numero)}
    >
        <div className="candidate-number">{candidato.numero}</div>
        <div className="candidate-name">{candidato.nome}</div>
    </div>
);

export const SpecialVoteButton = ({
    type,
    isSelected = false,
    onClick
}) => {
    const labels = {
        branco: 'VOTO EM BRANCO',
        nulo: 'VOTO NULO'
    };

    return (
        <div
            className={`special-vote ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(type)}
        >
            {labels[type] || type.toUpperCase()}
        </div>
    );
};

// ========== CONTAINERS DE BOTÕES ==========
export const CandidatesContainer = ({
    candidatos,
    votoSelecionado,
    onVotar
}) => (
    <div className="candidates">
        {candidatos.map(candidato => (
            <CandidateButton
                key={candidato.numero}
                candidato={candidato}
                isSelected={votoSelecionado === candidato.numero}
                onClick={onVotar}
            />
        ))}
    </div>
);

export const SpecialVotesContainer = ({
    votoSelecionado,
    onVotar
}) => (
    <div className="special-votes">
        <SpecialVoteButton
            type="branco"
            isSelected={votoSelecionado === 'branco'}
            onClick={onVotar}
        />
        <SpecialVoteButton
            type="nulo"
            isSelected={votoSelecionado === 'nulo'}
            onClick={onVotar}
        />
    </div>
);

// ========== GRUPOS DE CONTROLES ==========
export const LoginControls = ({ onLogin, onViewResults }) => (
    <div className="controls">
        <LoginButton onClick={onLogin} />
        <ViewResultsButton onClick={onViewResults} />
    </div>
);

export const VotingControls = ({
    hasVote,
    onNext,
    isLastStep = false
}) => (
    <div className="controls">
        {hasVote ? (
            <NextStepButton
                onClick={onNext}
                isLastStep={isLastStep}
            />
        ) : (
            <p>Selecione uma opção para continuar</p>
        )}
    </div>
);

export const ConfirmationControls = ({
    onBack,
    onConfirm
}) => (
    <div className="controls">
        <BackButton onClick={onBack} />
        <ConfirmVotesButton onClick={onConfirm} />
    </div>
);

export const SuccessControls = ({
    onNextVoter,
    onViewResults
}) => (
    <div className="controls">
        <NextVoterButton onClick={onNextVoter} />
        <ViewResultsButton onClick={onViewResults} />
    </div>
);

export const ResultsControls = ({
    onContinueVoting,
    onNewElection
}) => (
    <div className="controls">
        <ContinueVotingButton onClick={onContinueVoting} />
        <NewElectionButton onClick={onNewElection} />
    </div>
);

export default Button;