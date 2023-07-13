package com.hamhabocca.dallibocca.comment.service;

import com.hamhabocca.dallibocca.comment.dto.CommenetDTO;
import com.hamhabocca.dallibocca.comment.entity.Comment;
import com.hamhabocca.dallibocca.comment.repository.CommentRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

	private final CommentRepository commentRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public CommentService(CommentRepository commentRepository, ModelMapper modelMapper) {
		this.commentRepository = commentRepository;
		this.modelMapper = new ModelMapper();
	}

	public List<CommenetDTO> findAllComment() {
		List<Comment> comments = commentRepository.findAll();
		return comments.stream().map(comment -> modelMapper.map(comment, CommenetDTO.class))
			.collect(
				Collectors.toList());
	}

	@Transactional
	public void registNewComment(CommenetDTO newComment) {

		commentRepository.save(modelMapper.map(newComment, Comment.class));
	}
}
